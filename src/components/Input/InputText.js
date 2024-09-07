// import { useState } from "react"

// function InputText({labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType}){

//     const [value, setValue] = useState(defaultValue)

//     const updateInputValue = (val) => {
//         setValue(val)
//         updateFormValue({updateType, value : val})
//     }

//     return(
//         <div className={`form-control w-full ${containerStyle}`}>
//             <label className="label">
//                 <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
//             </label>
//             <input type={type || "text"} value={value} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e.target.value)}className="input  input-bordered w-full " />
//         </div>
//     )
// }

// export default InputText

import { useEffect, useState } from "react";

function InputText({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  value,
  placeholder,
  updateFormValue,
  updateType,
  isNumeric = false,
}) {
  //   const [inputValue, setInputValue] = useState(value);

  //   useEffect(() => {
  //     setInputValue(value);
  //   }, []);

  const updateInputValue = (val) => {
    if (isNumeric) {
      // Allow only numbers, decimal points, and negative signs for numeric inputs
      if (val === "" || /^[0-9.-]+$/.test(val)) {
        updateFormValue({ updateType, value: val });
      }
    } else {
      updateFormValue({ updateType, value: val });
    }
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <input
        type={type || "text"}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        className="input input-bordered w-full"
        autoComplete="false"
      />
    </div>
  );
}

export default InputText;
