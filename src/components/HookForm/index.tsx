import * as React from 'react';
import { useForm } from "react-hook-form";


type Props = {
  defaultValues?: object,
  onSubmit?: (any) => void,
  children: React.ReactNode,
};

const isReactElement = (v: any): v is React.ReactElement => v.props !== undefined;

const HookForm: React.FC<Props>= ({
  defaultValues,
  children,
  onSubmit
}) => {
  const methods = useForm({ defaultValues });
  const { 
    handleSubmit,
  } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {
        if (isReactElement(child) && child.props.name) {
          return React.createElement(child.type, {
            ...{
              ...child.props,
              register: methods.register,
              key: child.props.name
            }
          })
        }
        return child;
       })}
    </form>
  );
};

export default HookForm;