export const formFields = {
    loginFields : [
        { 
          name: "email",
          type: "email", 
          placeholder: "Email", 
          required: true 
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          required: true,
        },
      ],
      registerFields : [
          { 
             name: "username",
             type: "text", 
             placeholder: "Username", 
             required: true 
           },
           { 
             name: "email",
             type: "email", 
             placeholder: "Email", 
             required: true 
           },
           {
             name: "password",
             type: "password",
             placeholder: "Password",
             required: true,
           },
         ],
         customerFields : [
          { 
             name: "name",
             type: "text", 
             placeholder: "Name", 
             required: true 
           },
           { 
             name: "email",
             type: "email", 
             placeholder: "Email", 
             required: true 
           },
           {
             name: "number",
             type: "text",
             placeholder: "Number",
             required: true,
           },
         ]

  }