import { SiExpertsexchange } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-[#152336]  text-[#fff]">
      <aside >
        <Link className="text-white font-bolder text-[25px] flex items-center gap-2 mb-4"> <SiExpertsexchange /> <span>ExpenseTracker</span></Link>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Voluptatum dolore laudantium hic culpa consequatur <br />  quasi possimus fugit modi totam non. Error <br />  sunt ullam rerum? Inventore fuga autem modi <br />  
        </p>
      </aside>

      <nav >
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Clear & Easy Hisab </a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>

      <nav >
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>

      <nav >
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>

    </footer>
  );
};

export default Footer;
