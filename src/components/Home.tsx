import React, { useEffect } from 'react';
import { useDeleteDocMutation, useGetDocsQuery } from '../redux/apis/docApi';
import './img.css'; // Make sure the CSS file is applied
import { useDoc } from '../share/DocContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Home: React.FC = () => {
    const [deleteDoc, {isSuccess}]= useDeleteDocMutation()
  const { data, isLoading } = useGetDocsQuery();
//   console.log(data);
  
useEffect(() => {
    if(isSuccess){
        toast.success("Document Delete Succes")
    }
  }, [isSuccess])
  
  const { setSelectedData}= useDoc()
// useEffect(() => {
//     console.log(selectedData);
// }, [selectedData])
const  navigate = useNavigate()


  if (isLoading) return <div>Loading...</div>;


  return (
    <div className="container mt-5">
      <div className='p-4'>
      <h1 className="p-2 text-center font-monospace bold text-primary border border-primary  border-1 rounded rounded-3 ">Document List</h1>
      </div>
      <div className="table-responsive">
        <table className="table  table-striped rounded-table bg-primary">
          <thead className="table-header ">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Role</th>
              <th>Interests</th>
              <th>Verified</th>
              <th>Address</th>
              <th>Profile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {data && data.length > 0 ? (
    data.map((doc) => {
      let imageUrl = undefined;

      if (doc.profile instanceof File) {
        imageUrl = URL.createObjectURL(doc.profile); 
      } else if (typeof doc.profile === 'string') {
        imageUrl = doc.profile;
      }

      return (
        <tr key={doc._id}>
          <td>{doc.name}</td>
          <td>{doc.age}</td>
          <td>{doc.role}</td>
          <td>{doc.interests.map((item) => <p key={item}>{item}</p>)}</td>
          <td>{doc.isVerified ? 'Yes' : 'No'}</td>
          <td>{doc.address}</td>
          <td>
            <img
              src={imageUrl}
              className="profile-img rounded-circle"
              alt="profile"
            />
          </td>
          <td>
            <Button onClick={() => {
              setSelectedData(doc);
              navigate("/doc-form");
            }} className="btn btn-update btn-sm me-2">
              Update
            </Button>
            <Button onClick={()=> deleteDoc({id:doc._id})} className="btn btn-delete btn-sm">
              Delete
            </Button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan={8} className="text-center">No data available</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default Home;
