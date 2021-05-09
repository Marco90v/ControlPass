import { useState } from 'react';

export const useForm = (inicial={})=>{
    
    const [values, setIputValues] = useState(inicial);

    const reset = (opcional)=>{
        setIputValues(opcional || inicial);
    }

    const inputChange = ({target})=>{
        setIputValues({
            ...values,
            [target.name]: target.value
        });
    };

    return [values, inputChange, reset];

}