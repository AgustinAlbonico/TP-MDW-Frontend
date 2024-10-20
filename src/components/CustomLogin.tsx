import { FC, ReactElement } from 'react'

interface CustomLoginButtonProps {
    icon: ReactElement;
    text: string;
}

const CustomLoginButton: FC<CustomLoginButtonProps> = ({icon, text}) => {
  return (
    <div className='btn-primary flex justify-between items-center'>
        {icon}
        <p>Continua con {text}</p>
    </div>
  )
}

export default CustomLoginButton