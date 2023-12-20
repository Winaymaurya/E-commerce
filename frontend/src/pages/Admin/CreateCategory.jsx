import React,{useEffect,useState} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import { toast } from 'react-toastify'
import CategoryForm from '../../components/From/CategoryForm'
import {Modal} from "antd";
const CreateCategory = () => {
  const [categories,setCategories]=useState([])
  const [name,setName]=useState("")
  const [visible, setVisible] = useState(false)
  const [selected,setSelected]=useState(null)
  const [updatedName, setUpdatedName] = useState("");

  const handelSubmit=async (e)=>{
        e.preventDefault()
       try {
        const {data}=await axios.post('http://localhost:8080/api/v1/category/create-category',{name})
        if(data?.success){
          toast.success(data.message)
          getAllCategory()
        }
        else{
          toast.error(data.message)
        }
       } catch (error) {
        console.log(error)  
        toast.error("Something Wrong in adding category")
       }
  }
  // get all categories
  const getAllCategory=async()=>{
    try {
      const {data}=await axios.get('http://localhost:8080/api/v1/category/get-category')
      if(data?.success){
        setCategories(data?.category)
      }
      
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in getting Categories")
    }
  }
  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`,{ name: updatedName });
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${pId}`);
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="E-commerce Create Category">
        <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>Manage Categories</h3>
            <div className="p-3 w-75">
              <CategoryForm handleSubmit={handelSubmit} value={name} setValue={setName}/>
       
            </div>
          <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2"onClick={() => {handleDelete(c._id);}}>Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
