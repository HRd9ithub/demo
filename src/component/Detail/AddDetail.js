import React, { useEffect, useState } from 'react'
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddDetail = () => {

  const [data, setdata] = useState({
    facility: '',
    cost: ''
  });
  const [Type, setType] = useState([]);
  const [facility, setfacility] = useState([]);
  // error store facility form
  const [errorMsg, setErrorMsg] = useState({});
  const [Issubmit, setIssubmit] = useState(false);

  // new room state
  const [roomType, setroomType] = useState('1')
  const [selectfacility, setselectfacility] = useState([]);
  const [file, setfile] = useState('');
  const [error, setError] = useState({});
  const [submit, setsubmit] = useState(false);
  const [total, settotal] = useState(0);


  const History = useNavigate()

  const handlChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setdata({ ...data, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMsg(validation(data));
    setIssubmit(true);
  }
  const validation = (data) => {
    const error = {};

    if (!data.facility) {
      error.facility = "facility is Required."
    }

    if (!data.cost) {
      error.cost = 'cost is Required.'
    }

    return error;
  }

  const onSubmit = async () => {
    const { facility, cost } = data;
    try {
      let doc = await axios.post(`/hotel/add_facility`, { facility, cost });
      if (doc.status === 201) {
        History('/hotel_detail');
        toast.success("facility add is successfully!! ")
      } else {
        console.log("error")
        toast.error(doc.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (Object.keys(errorMsg).length === 0 && Issubmit) {
      onSubmit();
    }
  }, [errorMsg, Issubmit]);

  // get data room type
  useEffect(() => {
    const getDetail = async () => {
      try {
        let doc = await axios.get('/hotel/get_type');
        if (doc.status === 201) {
          setType(doc.data.result)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getDetail()
  }, []);

  const handlechangeType = (event) => {
    let value = event.target.value;

    setroomType(value);
  }

  // get type room facilities
  useEffect(() => {
    const getDetail = async () => {
      try {
        let doc = await axios.get('/hotel/get_facility');
        if (doc.status === 201) {
          setfacility(doc.data.result)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getDetail()
  }, []);

  const handlechangefacility = (e) => {
    let value = e.target.value;
    if (!selectfacility.includes(value)) {
      setselectfacility([...selectfacility, value])
    let obj = facility.find((elem) => {
       return elem.facility === value
      })
      settotal(total+obj.cost)
    } else {
      var index = selectfacility.indexOf(value);
      selectfacility.splice(index, 1)
      let obj = facility.find((elem) => {
        return elem.facility === value
       })
       settotal(total - obj.cost)
    }
  }


  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    setfile(file)
  }

  const handleroomSubmit = (event) => {
    event.preventDefault();
    setError(validate());
    setsubmit(true);
  }
  const validate= () => {
    const error = {};

    if (selectfacility.length === 0) {
      error.facility = "facility is Required."
    }

    if (!file) {
      error.file = 'image is Required.'
    }

    return error;
  }

  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      SubmitData();
    }
  }, [error, submit]);

  const SubmitData = async () => {
    var formdata = new FormData();
    formdata.append('type', roomType);
    formdata.append('facilities', JSON.stringify(selectfacility));
    formdata.append('photo', file)
    formdata.append('subTotal', total)

    const config = {
      Headers: {
        "Content-Type": "multipart/form-data"
      }
    }


    const doc_room = await axios.post('/hotel/add_room', formdata, config);
    if(doc_room.status === 201){
          toast.success(doc_room.data.message);
          setroomType('1');
          setfile("")
          setselectfacility([]);
          History('/hotel_detail')
    }else{
      console.log(doc_room.data.message)
    }

  }
  return (
    <>
      <Header />
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-10 mx-auto'>
            <section className='main_section'>
              <div className='add_facility'>
                <h4>Add new facilities</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicfacility">
                    <Form.Label>Facility :</Form.Label>
                    <Form.Control type="text" placeholder="Enter facility" name='facility' value={data.facility} onChange={handlChange} />
                    <Form.Text className="error">
                      {errorMsg.facility}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasiccost">
                    <Form.Label>Facility Cost :</Form.Label>
                    <Form.Control type="number" placeholder="Enter cost" name='cost' value={data.cost} onChange={handlChange} />
                    <Form.Text className="error">
                      {errorMsg.cost}
                    </Form.Text>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </Form>
              </div>
              <div className='add_facility'>
                <h4>Add new Room</h4>
                <Form >
                  <Form.Group className="mb-3" controlId="formBasicfacility">
                    <Form.Label>Room Type :</Form.Label>
                    <select name="types" id="types" className='form-control' value={roomType} onChange={handlechangeType}>
                      {Type.map((val) => {
                        return (
                          <option value={val.id} key={val.id}>{val.type}</option>
                        )
                      })}
                    </select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasiccost">
                    <Form.Label>Facility :</Form.Label>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <div className='facility-checkbox'>
                        {facility.map((val) => {
                          return (
                            <Form.Check type="checkbox" value={val.facility} label={val.facility} key={val.id} onChange={handlechangefacility} />
                          )
                        })}
                      </div>
                    <Form.Text className="error">
                      {error.facility}
                    </Form.Text>
                    </Form.Group>
                  </Form.Group>

                  <Form.Group className="position-relative mb-3">
                    <Form.Label>File</Form.Label>
                    <Form.Control
                      type="file"
                      required
                      name="photo"
                      onChange={handleChangeFile}
                    />
                     <Form.Text className="error">
                      {error.file}
                    </Form.Text>
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleroomSubmit}>
                    Add Room
                  </Button>
                </Form>
              </div>

            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddDetail