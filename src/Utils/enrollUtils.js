
interface IOnEnroll {
    navigate:any;
    loggedin:boolean;
    price:number;
    pathname: string; 
    id:string;
    setDetails: any;
    paymentcase:'course' | 'learning-path';
    discount: number;
    appliedcoupon : any
}

export const OnEnrollUtils = {
    onEnroll : ({navigate,loggedin,pathname,price,id,setDetails,paymentcase,discount,appliedcoupon}:IOnEnroll) =>{
        console.log(navigate)
        setDetails({case:paymentcase,price,id,discount:discount,name:pathname})
        if(loggedin){
            if (appliedcoupon != null) {
                navigate('/payment?coupon='+appliedcoupon)
            } else (
            navigate('/payment')
            )
        }
        else{
            const url = navigate.location.pathname;
            navigate('/welcome?redirect=/payment&course='+pathname)
        }
        
        
    }
}