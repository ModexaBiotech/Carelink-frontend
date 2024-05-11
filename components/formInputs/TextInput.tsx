// import React from 'react'
// type TextInputProps = {
//     label: string,
//     register:
// }

// export default function TextInput({label}: TextInputProps) {
//   return (
//     <div>
//     <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
//       {label}
//     </label>
//     <div className="mt-2">
//       <input
//       {...register("firstName", {required: true})}
//         id="firstName"
//         name="firstName"
//         type="text"
//         autoComplete="name"
//         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//       />
//       {errors.firstName && <span className="text-red-600">first name is required</span>}
//     </div>
//   </div>
//   )
// }