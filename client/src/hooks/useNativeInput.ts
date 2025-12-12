import { Dispatch, SetStateAction, ChangeEvent } from "react";

const useNativeInput = <T extends object>(
    state: T,
    setSate: Dispatch<SetStateAction<T>>) => 
    (e: ChangeEvent<HTMLInputElement>) =>{
        const {name} = e.target;
        const dataIsFile = e.target.type === 'file' && e.target.files;
        // const image = dataIsFile? e.target.files?.[0] : undefined;
        setSate({
            ...state,
            [name]: dataIsFile? e.target.files?.[0] : e.target.value
        })
    }

export default useNativeInput;