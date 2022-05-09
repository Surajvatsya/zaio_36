import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import lectureService from '../../actions/services/lecture.service'
class NewLecture extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      courseid: this.props.courseid,
      courseunitid:this.props.courseunitid,
      lecturename:"",
      lectureno:null,
      lectureurl:"",
      checkpoint:[],
      temptimemin:0,
      temptimesec:0,
      temppause: false,
      tempurl:"",
      tempid:0,
      editor:"codesandbox"
    }
  }

  async componentDidMount(){
    if(this.props.lectureid){
      const res = await lectureService.getLecture(this.props.lectureid);
      console.log(res)
      if(res.success)
      {
        this.setState({...res.data})
      }
      else{
        alert('please enroll in the course to make a change to lecture')
      }
    }
  }
  setValue = (key,value,callback) =>{
    this.setState({
      [key]:value
    },callback)
  }
  onSubmit = (e) =>{
    e.preventDefault();
    
    const funct = async () => {
    let res = null 
    try {
      this.props.setLoading(true);
      if(this.props.lectureid){
        res = await lectureService.putLecture(this.state)
      }
      else{
        res = await lectureService.postLecture(this.state);
      }
      if(res.success){
        this.props.setUpdate(true);
        this.props.setNewLectureShow(false);
        this.props.setLoading(false);
      }
    } catch (error) {
      alert("Something went wrong")
    }
    
    
  }
  funct();
  }
  render(){
    console.log(this.state)
    return(
        <Form className="w-75 ml-0 ml-md-5 p-2 bg-white" style={{height:'fit-content'}} onSubmit={e=>this.onSubmit(e)}>
          <Form.Group >
            <Form.Label>Lecture Name</Form.Label>
            <Form.Control required type="text" placeholder="Lecture Name" value={this.state.lecturename} onChange={e=>this.setValue('lecturename',e.target.value)}/>
          </Form.Group>

          <Form.Group >
            <Form.Label>Lecture Number</Form.Label>
            <Form.Control required type="text" placeholder="Lecture Number" value={this.state.lectureno} onChange={e=>this.setValue('lectureno',e.target.value)}/>
          </Form.Group>

          {/* <Form.Group> 
             <Form.File 
            accept="video/*"
            label="Video"
            onChange={e=>this.setValue('lecturevideo',e.target.files[0])}
          />
          </Form.Group> */}
          <Form.Group >
            <Form.Label>Lecture Video URL</Form.Label>
            <Form.Control required type="text" placeholder="Lecture Name" value={this.state.lectureurl} onChange={e=>this.setValue('lectureurl',e.target.value)}/>
          </Form.Group>

          <Form.Group >
            <Form.Label>Editor</Form.Label>
            <Form.Control re as="select" size="md" value={this.state.editor} onChange={e=>this.setValue('editor',e.target.value)}>
              <option value="codesandbox">CodeSandBox</option>
              <option value="paiza">Paiza</option>
            </Form.Control>
          </Form.Group>

          
          <Form.Group>
            <Form.Row>
              <Col>
                <Form.Control 
                    placeholder="Time (m)" 
                    value={this.state.temptimemin} 
                    onChange={e=>this.setState({temptimemin:e.target.value})}/>
                minutes
              </Col>
              <Col>
                <Form.Control 
                    placeholder="Time (s)" 
                    value={this.state.temptimesec} 
                    onChange={e=>this.setState({temptimesec:e.target.value})}/>
                    seconds
              </Col>
              <Col>
                  <Form.Check
                  className="mt-2" 
                  checked={this.state.temppause}
                  type='checkbox'
                  label='Pause'
                  onClick={e=>this.setState({temppause:!this.state.temppause})}
              />
              </Col>
              </Form.Row>
          </Form.Group>

          <Form.Group>
                <Form.Control 
                    placeholder="SandBox ID" 
                    value={this.state.tempurl} 
                    onChange={e=>this.setState({tempurl:e.target.value})}/>
          </Form.Group>
          <Form.Group>
                <Button 
                  onClick={e=>this.setState(prevstate=>(
                    {
                      checkpoint:[...prevstate.checkpoint,
                        { checkpointtime: +prevstate.temptimemin*60+ +prevstate.temptimesec,
                          checkpointdataurl:prevstate.tempurl,
                          checkpointpause: prevstate.temppause,
                          key:prevstate.tempid
                        }
                      ],
                      tempid:prevstate.tempid+1,
                      tempurl:"",
                      temptimemin: 0,
                      temptimesec: 0,
                      temppause: false,
                    }
                  ))}>
                    ADD
                    </Button>
                    </Form.Group>

          <Form.Group>
          {this.state.checkpoint.map((cp)=>{
            return(<Form.Row key={cp._id? cp._id : cp.key}>
                <Col>
                    <Form.Control type="number" placeholder={`${cp.checkpointtime} sec`} readOnly />
                </Col>
                <Col>
                    <Form.Control type="text" placeholder={`${cp.checkpointdataurl}`} />
                </Col>
                <Col>
                    <Form.Check type="checkbox" checked={cp.checkpointpause=="true"?true:false} readOnly />
                </Col>
                <Col>
                  <Button 
                    onClick={e=>this.setState(prevstate=>{
                      if(cp._id){
                        return({
                          checkpoint:prevstate.checkpoint.filter(x=>x._id!==cp._id)
                        })
                      }
                      return({
                        checkpoint:prevstate.checkpoint.filter(x=>x.key!==cp.key)
                      })
                    })}>
                      DELETE
                    </Button>
              </Col>
            </Form.Row>)
          })}
          </Form.Group>

          <Button variant="success" type="submit" className='mt-3' onClick={e=>this.onSubmit(e)}>
            Submit
          </Button>
        </Form>
    )
    }
}

export default NewLecture
