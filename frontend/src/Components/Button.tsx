import { Button, Spinner } from "@radix-ui/themes"
import React from "react"


export const CustomButton = ({onClick,children,loading=false,className}:{onClick: ()=>void, children: React.ReactNode, loading?: boolean,className?:string})=>{
      return <Button className={`cursor-pointer capitalize ${className}`} disabled={loading} variant="classic" size='4' onClick={onClick}>
        {children}
        <Spinner loading={loading}>
        </Spinner>
      </Button>    
}