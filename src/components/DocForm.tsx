import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IDoc, useAddDocMutation, useUpdateDocMutation } from '../redux/apis/docApi';
import { toast } from 'sonner';
import { useDoc } from '../share/DocContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// const schema = z.object({
//     profile: z
//     .instanceof(File, { message: "Profile file is required" })
//     .refine((file) => file !== undefined, {
//         message: "Profile file is required",
//     })
//     .optional() ,// Make it optional so it can be null or undefined

//     name: z.string().nonempty("Name is required"),
//     age: z.string(),
//     address: z.string().nonempty("Address is required"),
//     birthDate: z.string().nonempty("Birth date is required"),
//     role: z.string().default("user"),
//     isVerified: z.boolean().default(false),
//     gender: z.string(),
//     interests: z.array(z.string().min(1, "At least one interest is required")),
// });

// type fd = z.infer<typeof schema>;

// const DocForm: React.FC = () => {
//     const { selectedData, setSelectedData } = useDoc();
//     const [updateDoc, {isSuccess:updateSuccess, isLoading:updateLoading}] = useUpdateDocMutation();
//     const [addDoc, { isSuccess, isLoading }] = useAddDocMutation();
//     const { register,  handleSubmit, formState: { errors }, setValue, reset,watch  } = useForm<fd>({
//         resolver: zodResolver(schema),
//         defaultValues:{
//             interests:[]

//         }
//     }); 
//      watch('interests');


//      const interests = watch('interests') || []; 

//      const handleInterestChange = (interest: string) => {
//        const updatedInterests = interests.includes(interest)
//          ? interests.filter(item => item !== interest)
//          : [...interests, interest];
   
//        setValue('interests', updatedInterests);
//      };
   
      
      
//  const navigate = useNavigate()
   
//     const onSubmit = (data:IDoc) => {
//         const fd = new FormData();
    
//         fd.append('name', data.name);
//         fd.append('age', data.age);
//         fd.append('address', data.address);
//         fd.append('birthDate', data.birthDate);
//         fd.append('gender', data.gender);
//         fd.append('role', data.role);
//         fd.append('isVerified', String(data.isVerified));
//         // fd.append("interests", data.interests);
//         for (const item of data.interests) {
//             fd.append("interests", item)
//         }
    
//         if (data.profile) {
//             fd.append('image',data.profile); 
//        }
    
//         if (selectedData&& selectedData._id) {            
//             updateDoc({ fd, _id:selectedData._id }); 
//         } else {
         
//             addDoc(fd); 
//         }
//     };

//     useEffect(() => {
//      if(selectedData){
//          setValue("name", selectedData.name)
//          setValue("age", selectedData.age)
//          setValue("address", selectedData.address)
//          setValue("interests", selectedData.interests)
//          setValue("birthDate", selectedData.birthDate)
//          setValue("gender", selectedData.gender)
//         //  setValue("profile", selectedData.profile)
//          setValue("isVerified", selectedData.isVerified)
//          setValue("role", selectedData.role)
//      }
//     })
    

//     useEffect(() => {
//         if (isSuccess) {
//             toast.success( "Doc Added Successfully");
//             reset();
//         }
//     }, [isSuccess, reset]);


//     useEffect(() => {
//         if (updateSuccess) {
//             toast.success( "Doc Updated Successfully");
//             localStorage.removeItem("selectedData")
//             setSelectedData(null)
//             reset();
//             navigate("/")
//         }
//     });

//     return (
//         <div className="container mt-5">
//             <div className="card p-4">
//                 <div className="card-header bg-primary text-white text-center">
//                     <h3>{selectedData ? 'Edit Document' : 'Create Document'}</h3>
//                 </div>
//                 <div className="card-body">
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         {/* <pre>{errors && JSON.stringify(errors, null, 2)}</pre> */}
//                         {isLoading || updateLoading? (
//                             <div className="loading-page">
//                                 <div>
//                                     <div className="spinner"></div>
//                                     <div className="loading-text">Loading...</div>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="row">
//                                 {/* Profile Image */}
//                                 <div className="col-sm-12 col-md-6">
//     <div className="form-group">
//         <label htmlFor="profile">Profile Image</label>
//         <input
//             onChange={e => {
//                 const file = e.target.files ? e.target.files[0] : undefined;
//                 setValue("profile", file); 
//             }}
//             type="file"
//             id="profile"
//             name="profile"
//             accept="image/*"
//             className={`form-control ${errors.profile ? 'is-invalid' : ''}`}
//         />
//         {errors.profile && <div className="invalid-feedback">{errors.profile.message}</div>}
//     </div>
// </div>



//                                 {/* Name Input */}
//                                 <div className="col-sm-12 col-md-6">
//     <div className="form-group">
//         <label htmlFor="name">Name</label>
       
//                 <input
//                     type="text"
//                     className={`form-control ${errors.name ? 'is-invalid' : ''}`}
//                       {...register("name")}
//                     placeholder="Enter your name"
//                 />
          
//         {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
//     </div>
// </div>


//                                 {/* Age Input */}
//                                 <div className="col-sm-12 col-md-6">
//                                     <div className="form-group">
//                                         <label htmlFor="age">Age</label>
                                       
//                                                 <input
//                                                     type="number"
//                                                     className={`form-control ${errors.age ? 'is-invalid' : ''}`}
//                                                     {...register("age")}
//                                                     placeholder="Enter your age"
//                                                 />
                                         
//                                         {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
//                                     </div>
//                                 </div>

//                                 {/* Address Input */}
//                                 <div className="col-sm-12">
//                                     <div className="form-group">
//                                         <label htmlFor="address">Address</label>
                                     
//                                                 <input
//                                                     type="text"
//                                                     className={`form-control ${errors.address ? 'is-invalid' : ''}`}
//                                                     {...register("address")}
//                                                     placeholder="Enter your address"
//                                                 />
                                          
//                                         {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
//                                     </div>
//                                 </div>

//                                 {/* Birth Date Input */}
//                                 <div className="col-sm-12 col-md-6">
//                                     <div className="form-group">
//                                         <label htmlFor="birthDate">Birth Date</label>
                                     
//                                                 <input
//                                                     type="date"
//                                                     className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
//                                                     {...register("birthDate")}
//                                                 />
                                           
//                                         {errors.birthDate && <div className="invalid-feedback">{errors.birthDate.message}</div>}
//                                     </div>
//                                 </div>

//                                 {/* Gender Input - Radio Buttons */}
//                                 <div className="col-sm-12 col-md-6">
//                                     <div className="form-group m-3">
//                                         <label>Gender</label>
//                                         <div className="d-flex">
                                         
//                                                     <>
//                                                         <div className="form-check">
//                                                             <input
//                                                                 type="radio"
//                                                                 id="male"
//                                                                 className="form-check-input"
//                                                                 {...register("gender")}
//                                                                 value="male"
                                                              
//                                                             />
//                                                             <label className="form-check-label" htmlFor="male">Male</label>
//                                                         </div>
//                                                         <div className="form-check">
//                                                             <input
//                                                                 type="radio"
//                                                                 id="female"
//                                                                 className="form-check-input"
//                                                                 {...register("gender")}
//                                                                 value="female"
//                                                                 // checked={field.value === "female"}
//                                                                 // onChange={() => field.onChange("female")}
//                                                             />
//                                                             <label className="form-check-label" htmlFor="female">Female</label>
//                                                         </div>
//                                                     </>
                                           
//                                         </div>
//                                         {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
//                                     </div>
//                                 </div>

//                                 {/* Interests Input - Checkboxes with Controller */}
//                                 <div className="col-sm-12">
//       <div className="form-group">
//         <label>Interests</label>
//         <div>
//           {['sports', 'music', 'movies', 'tech'].map((interest) => (
//             <div key={interest}>
//               <input
//                 type="checkbox"
//                 id={interest}
//                 value={interest}
//                 {...register('interests')}  
//                 checked={interests.includes(interest)}
//                 onChange={() => handleInterestChange(interest)}
//               />
//               <label htmlFor={interest}>
//                 {interest.charAt(0).toUpperCase() + interest.slice(1)}
//               </label>
//             </div>
//           ))}
//         </div>
//         {errors.interests && (
//           <div className="invalid-feedback">
//             {errors.interests.message}
//           </div>
//         )}
//       </div>
//     </div>



//                                 {/* Submit Button */}
//                                 <div className="col-sm-12">
//                                     <Button type='submit' className="btn btn-primary w-100">
//                                         {selectedData ? 'Update Document' : 'Submit'}
//                                     </Button>
//                                 </div>
//                                {
//                                 selectedData &&  <div className="d-flex justify-content-center">
//                                 <Button onClick={()=>{
//                                     setSelectedData(null)
// navigate("/")
//                                 }} className="btn btn-primary w-50 m-3">
//                                    update Cancel
//                                 </Button>
//                             </div>
//                                }
//                             </div>
//                         )}
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DocForm;

const DocForm: React.FC = () => {
    const { selectedData, setSelectedData } = useDoc();
    const [updateDoc, { isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdateDocMutation();
    const [addDoc, { isSuccess, isLoading }] = useAddDocMutation();
    const navigate = useNavigate();

    // Dynamic schema based on selectedData
    const getSchema = (isEdit: boolean) =>
        z.object({
            profile: isEdit
                ? z.instanceof(File).optional() 
                : z
                      .instanceof(File, { message: "Profile file is required" })
                      .refine((file) => file !== undefined, {
                          message: "Profile file is required",
                      }),
            name: z.string().nonempty("Name is required"),
            age: z.string(),
            address: z.string().nonempty("Address is required"),
            birthDate: z.string().nonempty("Birth date is required"),
            role: z.string().default("user"),
            isVerified: z.boolean().default(false),
            gender: z.string(),
            interests: z.array(z.string().min(1, "At least one interest is required")),
        });

    const isEdit = Boolean(selectedData); 
    const schema = getSchema(isEdit);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch,
    } = useForm<fd>({
        resolver: zodResolver(schema),
        defaultValues: {
            interests: [],
        },
    });

    const interests = watch("interests") || [];

    const handleInterestChange = (interest: string) => {
        const updatedInterests = interests.includes(interest)
            ? interests.filter((item) => item !== interest)
            : [...interests, interest];
        setValue("interests", updatedInterests);
    };

    const onSubmit = (data: IDoc) => {
        const fd = new FormData();

        fd.append("name", data.name);
        fd.append("age", data.age);
        fd.append("address", data.address);
        fd.append("birthDate", data.birthDate);
        fd.append("gender", data.gender);
        fd.append("role", data.role);
        fd.append("isVerified", String(data.isVerified));

        for (const item of data.interests) {
            fd.append("interests", item);
        }

        if (data.profile) {
            fd.append("image", data.profile);
        }

        if (isEdit && selectedData?._id) {
            updateDoc({ fd, _id: selectedData._id });
        } else {
            addDoc(fd);
        }
    };

    useEffect(() => {
        if (selectedData) {
            setValue("name", selectedData.name);
            setValue("age", selectedData.age);
            setValue("address", selectedData.address);
            setValue("interests", selectedData.interests);
            setValue("birthDate", selectedData.birthDate);
            setValue("gender", selectedData.gender);
            setValue("isVerified", selectedData.isVerified);
            setValue("role", selectedData.role);
        }
    }, [selectedData, setValue]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Doc Added Successfully");
            reset();
        }
    }, [isSuccess, reset]);

    useEffect(() => {
        if (updateSuccess) {
            toast.success("Doc Updated Successfully");
            localStorage.removeItem("selectedData");
            setSelectedData(null);
            reset();
            navigate("/");
        }
    }, [updateSuccess]);

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <div className="card-header bg-primary text-white text-center">
                    <h3>{isEdit ? "Edit Document" : "Create Document"}</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {isLoading || updateLoading ? (
                            <div className="loading-page">
                                <div>
                                    <div className="spinner"></div>
                                    <div className="loading-text">Loading...</div>
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                {/* Profile Image */}
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="profile">Profile Image</label>
                                        <input
                                            onChange={(e) => {
                                                const file = e.target.files ? e.target.files[0] : undefined;
                                                setValue("profile", file);
                                            }}
                                            type="file"
                                            id="profile"
                                            name="profile"
                                            accept="image/*"
                                            className={`form-control ${errors.profile ? "is-invalid" : ""}`}
                                        />
                                        {errors.profile && <div className="invalid-feedback">{errors.profile.message}</div>}
                                    </div>
                                </div>

                                 {/* Name Input */}
                                 <div className="col-sm-12 col-md-6">
     <div className="form-group">
         <label htmlFor="name">Name</label>
       
                 <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      {...register("name")}
                    placeholder="Enter your name"
                />
          
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
    </div>
</div>


                                {/* Age Input */}
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="age">Age</label>
                                       
                                                <input
                                                    type="number"
                                                    className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                                                    {...register("age")}
                                                    placeholder="Enter your age"
                                                />
                                         
                                        {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
                                    </div>
                                </div>

                                {/* Address Input */}
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                     
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                                    {...register("address")}
                                                    placeholder="Enter your address"
                                                />
                                          
                                        {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                                    </div>
                                </div>

                                {/* Birth Date Input */}
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="birthDate">Birth Date</label>
                                     
                                                <input
                                                    type="date"
                                                    className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
                                                    {...register("birthDate")}
                                                />
                                           
                                        {errors.birthDate && <div className="invalid-feedback">{errors.birthDate.message}</div>}
                                    </div>
                                </div>

                                {/* Gender Input - Radio Buttons */}
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group m-3">
                                        <label>Gender</label>
                                        <div className="d-flex">
                                         
                                                    <>
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="male"
                                                                className="form-check-input"
                                                                {...register("gender")}
                                                                value="male"
                                                              
                                                            />
                                                            <label className="form-check-label" htmlFor="male">Male</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="female"
                                                                className="form-check-input"
                                                                {...register("gender")}
                                                                value="female"
                                                                // checked={field.value === "female"}
                                                                // onChange={() => field.onChange("female")}
                                                            />
                                                            <label className="form-check-label" htmlFor="female">Female</label>
                                                        </div>
                                                    </>
                                           
                                        </div>
                                        {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
                                    </div>
                                </div>

                                {/* Interests Input - Checkboxes with Controller */}
                                <div className="col-sm-12">
      <div className="form-group">
        <label>Interests</label>
        <div>
          {['sports', 'music', 'movies', 'tech'].map((interest) => (
            <div key={interest}>
              <input
                type="checkbox"
                id={interest}
                value={interest}
                {...register('interests')}  
                checked={interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
              />
              <label htmlFor={interest}>
                {interest.charAt(0).toUpperCase() + interest.slice(1)}
              </label>
            </div>
          ))}
        </div>
        {errors.interests && (
          <div className="invalid-feedback">
            {errors.interests.message}
          </div>
        )}
      </div>
    </div>


                                <div className="col-sm-12">
                                    <Button type="submit" className="btn btn-primary w-100">
                                        {isEdit ? "Update Document" : "Submit"}
                                    </Button>
                                </div>
                                {isEdit && (
                                    <div className="d-flex justify-content-center">
                                        <Button
                                            onClick={() => {
                                                setSelectedData(null);
                                                navigate("/");
                                            }}
                                            className="btn btn-primary w-50 m-3"
                                        >
                                            Cancel Update
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DocForm;

