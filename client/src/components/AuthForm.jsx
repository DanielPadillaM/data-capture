import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import { useCustomers } from "../hooks";

export const AuthForm = ({
  title = "",
  fields = [],
  onSubmit,
  errors = [],
  submitLabel = "Enviar",
  redirect = {},
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: formErrors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const params = useParams();
   const {getCustomer} = useCustomers()

  const handleFromSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
    const result = await onSubmit(data);
    console.log(result)
    if (!result?.ok) setLoading(false);
    } catch (error) {
      console.error("Submit error:",error)
      setLoading(false)
    }
  });

   
   useEffect(() => {
      async function loadCustomer() {
        if(!params.id) return
        try {
         
          const { data } = await getCustomer(params.id);

          fields.forEach((field)=>{
            if(data[field.name] !== undefined){
              setValue(field.name,data[field.name])
            }
          }) 
      }catch (error) {
          console.error("Error loading customer:", error)
        }
      
      }
      loadCustomer();
    }, [params.id,getCustomer,setValue,fields]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-sm p-10 rounded-md">
        {errors?.length > 0 &&
          errors.map((error, i) => (
            <p key={i} className="bg-red-500 p-2 text-white">
              {error}
            </p>
          ))}

        <h1 className="text-2xl font-bold">{title}</h1>

        <form onSubmit={handleFromSubmit}>
          {fields.map(({ name, type, placeholder, required },i) => (
            
            <div key={i}>
              
              <input
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                type={type}
                placeholder={placeholder}
                {...register(name, { required })}
              />
              {formErrors[name] && (
                <p className="text-red-500">{placeholder} is required</p>
              )}
            </div>
          ))}
          <button
            className="bg-indigo-500 px-4 py-1 rounded-sm my-2 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : submitLabel}
          </button>
        </form>
          {redirect.text && (
              <p className="flex gap-x-2">
              {redirect.text}
              <Link className="text-sky-500" to={redirect.to}>
                {redirect.linkText}
              </Link>
              </p>

          )}
        
      </div>
    </div>
  );
};
