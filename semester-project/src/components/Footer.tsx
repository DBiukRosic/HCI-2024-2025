import Logo from "@/components/Logo";

const Footer = () => {
    return (
      <div className="bg-brand-blue-300 flex justify-between items-center p-2">
        <div className="flex flex-col">
          <a className="flex items-center"> 
            <span className="font-urbanist text-brand-orange-75 text-2xl mr-2">Find us on:</span> 
            <img
              className="w-24 h-24" 
              src="/footer/socials.png"
              alt="facebook and instagram logos"
            />
          </a>
        </div>
        <div className="flex flex-col">
          <Logo />     
        </div>
      </div>
    );
  };
  
  export default Footer;