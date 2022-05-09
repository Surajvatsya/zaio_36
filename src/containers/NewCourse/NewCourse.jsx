import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormData from 'form-data'
import {Navigate} from 'react-router-dom'
import courseService from '../../actions/services/course.service'
class NewCourse extends React.Component {
  constructor(props){
    super(props)
    if(this.props.edit){
      this.state = {
        _id:this.props.course._id,
        coursethumbnailurl:this.props.course.coursethumbnailurl,
        courselevel:this.props.course.courselevel,
        coursename:this.props.course.coursename,
        courseprerequisites:this.props.course.courseprerequisites,
        coursetags:this.props.course.coursetags,
        courseteacher:this.props.course.courseteacher,
        courselearning:this.props.course.courselearning,
        coursedescription:this.props.course.coursedescription,
        courseinside:this.props.course.courseinside,
        iscoursepro:this.props.course.iscoursepro,
        whythiscourse:this.props.course.whythiscourse,
        success:false,
        courseduration:this.props.course.courseduration,
        coursecomingsoon:this.props.course.coursecomingsoon?this.props.course.coursecomingsoon:false,
        courseprice:this.props.course.courseprice?this.props.course.courseprice:0,
        coursediscount:this.props.course.coursediscount?this.props.course.coursediscount:0,
        coursediscountexpiry:this.props.course.coursediscountexpiry?this.props.course.coursediscountexpiry:0,
      }
      
    }
    else{
      this.state = {
        coursethumbnail:null,
        courselevel:'beginner',
        coursetags:"",
        courselearning:"",
        iscoursepro:false,
        success:false,
        coursecomingsoon:false
      }
    }

  }
  setValue = (key,value,callback) =>{
    this.setState({
      [key]:value
    },callback)
  }
  onSubmit = (e) =>{
        const funct = async () =>{
          
          var data = {...this.state}
          if(!this.props.edit){
          data.coursetags = this.state.coursetags.split(',');
          data.courselearning = this.state.courselearning.split(',');
          }

          let formdata = new FormData();
          for(const key in data){
            formdata.append(key,this.state[key]);
          }
          let res;
          try{
            this.props.setLoading(true);
            if(this.props.edit){
           res = await courseService.putCourse(formdata,data);
            }
            else{
            res = await courseService.postCourse(formdata);
            }
            if(res.success){
              
              if(res.data._id){
                this.setState({redirectid:res.data._id,'success':true});
                if(this.props.edit){
                this.props.setEdit(false);
                this.props.setUpdate(true);
                }
              }
            }
            else{
              alert('something went wrong')
            }
           
          }
          catch(error){
            alert('something went wrong')
          }
          this.props.setLoading(false);

        }
        e.preventDefault();
        
        funct();
  }
  render(){
    if(this.state.success){
      return <Navigate to={`/admin/course/${this.state.redirectid}`} />
    }
    return(
        <Form className="w-75 ml-0 ml-md-5 p-2 bg-white" style={{height:'fit-content'}} onSubmit={e=>this.onSubmit(e)}>
          <h1>Add a New Course</h1>
          <br></br>
          <Form.Group >
            <Form.Label>Course Name</Form.Label>
            <Form.Control required type="text" placeholder="Course Name" value={this.state.coursename} onChange={e=>this.setValue('coursename',e.target.value)}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>Course Description</Form.Label>
            <Form.Control required as="textarea" rows={3} placeholder="Course Description" value={this.state.coursedescription} onChange={e=>this.setValue('coursedescription',e.target.value)}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>Course Prerequisites</Form.Label>
            <Form.Control required as="textarea" rows={3} placeholder="Course Prerequisites" value={this.state.courseprerequisites} onChange={e=>this.setValue('courseprerequisites',e.target.value)}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>Course Teacher</Form.Label>
            <Form.Control required type="text" placeholder="Course Teacher" value={this.state.courseteacher} onChange={e=>this.setValue('courseteacher',e.target.value)}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>Course Price</Form.Label>
            <Form.Control required type="number" placeholder="Course Price" value={this.state.courseprice} onChange={e=>this.setValue('courseprice',e.target.value)}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>Course Discount</Form.Label>
            <Form.Control required type="number" placeholder="Course Discount" value={this.state.coursediscount} onChange={e=>this.setValue('coursediscount',e.target.value)}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>Course Discount Expiry</Form.Label>
            <Form.Control required type="number" placeholder="Course Discount Expiry Days" value={this.state.coursediscountexpiry} onChange={e=>this.setValue('coursediscountexpiry',e.target.value)}/>
          </Form.Group>
          <Form.File 
            accept="image/*"
            label="Teacher's Image"
            onChange={e=>this.setValue('coursethumbnail',e.target.files[1])}
          />
          <Form.Group >
            <Form.Label>Why this Course</Form.Label>
            <Form.Control required as="textarea" rows={3} placeholder="Why this Course" value={this.state.whythiscourse} onChange={e=>this.setValue('whythiscourse',e.target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Course level</Form.Label>
            <Form.Control required as="select" value={this.state.courselevel} onChange={e=>this.setValue('courselevel',e.target.value)}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="professional">Professional</option>
            </Form.Control>
          </Form.Group>
          <Form.Group >
            <Form.Label>Course Inside</Form.Label>
            <Form.Control required as="textarea" rows={3} placeholder="Course Inside" value={this.state.courseinside} onChange={e=>this.setValue('courseinside',e.target.value)}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>Course Duration</Form.Label>
            <Form.Control required type="text" placeholder="3 hr 45 min" value={this.state.courseduration} onChange={e=>this.setValue('courseduration',e.target.value)}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>Course Tags (comma separated)</Form.Label>
            <Form.Control required type="text" placeholder="Course Tags" value={this.state.coursetags} onChange={e=>this.setValue('coursetags',e.target.value)}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>Course Learnings (comma separated)</Form.Label>
            <Form.Control required as="textarea" rows={3} placeholder="Course Learnings" value={this.state.courselearning} onChange={e=>this.setValue('courselearning',e.target.value)}/>
          </Form.Group>
          <Form.File 
            accept="image/*"
            label="Thumbnail Image"
            onChange={e=>this.setValue('coursethumbnail',e.target.files[0])}
          />
          
          {this.props.edit?<a href={this.state.coursethumbnailurl} target="__blank">Thumbnail Image</a>:null}
          <Form.Check
              className="mt-2" 
              checked={this.state.iscoursepro}
              type='checkbox'
              label='Pro Course?'
              onClick={e=>this.setState(prevState=>({iscoursepro:!prevState.iscoursepro}),()=>console.log(this.state.iscoursepro))}
          />
          <Form.Check
              className="mt-2" 
              checked={this.state.coursecomingsoon}
              type='checkbox'
              label='Coming Soon'
              onClick={e=>this.setState(prevState=>({coursecomingsoon:!prevState.coursecomingsoon}),()=>console.log(this.state.coursecomingsoon))}
          />
          <Button variant="success" type="submit" className='mt-3' onClick={e=>this.onSubmit(e)}>
            Submit
          </Button>
        </Form>
    )
    }
}

export default NewCourse
