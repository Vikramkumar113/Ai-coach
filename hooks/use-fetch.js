import { useState } from "react";
import { toast } from "sonner";

const useFectch = (cb)=>{

  const [data, setData] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const fn = async (...args)=>{
     setLoading(true);
     setError(null)

    try{
      const response = await cb(...args)
      setData(response);
      setError(null);
    }catch(error){
      setError(error.message);
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  return { loading, data, error, fn, setData}
}

export default useFectch;