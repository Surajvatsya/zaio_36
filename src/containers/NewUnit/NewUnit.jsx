import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import unitService from '../../actions/services/unit.service'
class NewUnit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      courseid: this.props.courseid,
      unitname:"",
      unitno:0,
    }
  }
  setValue = (key,value,callback) =>{
    this.setState({
      [key]:value
    },callback)
  }
  onSubmit = (e) =>{
        const funct = async () =>{
          try{
            let res = await unitService.postUnit(this.state);
            console.log({res})
            if(res.success){
              this.props.setUpdate(true);
              this.props.setNewUnit(false);
            }
            else{
              alert(res.message.message)
            }
          }
          catch(error){
            alert(error)
          } 
        }
        e.preventDefault();
        
        funct();
  }
  render(){
    return(
        <Form className="w-75 ml-0 ml-md-5 p-2 bg-white" style={{height:'fit-content'}} onSubmit={e=>this.onSubmit(e)}>
          <Form.Group>
            <Form.Label>Unit Name</Form.Label>
            <Form.Control required type="text" placeholder="Unit Name" value={this.state.unitname} onChange={e=>this.setValue('unitname',e.target.value)}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>Unit Number</Form.Label>
            <Form.Control required type="text" placeholder="Unit Number" value={this.state.unitno} onChange={e=>this.setValue('unitno',e.target.value)}/>
          </Form.Group>
          <Button disabled={this.state.loading} variant="success" type="submit" className='mt-3' onClick={e=>this.onSubmit(e)}>
            Submit
          </Button>
        </Form>
    )
    }
}

export default NewUnit
