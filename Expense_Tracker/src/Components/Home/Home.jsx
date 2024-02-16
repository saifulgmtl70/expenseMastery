import IncExp from '../IncExp/IncExp';
import './Home.css'

const Home = () => {
    return (
        <main >
            <section className="Home_banner flex flex-col items-center justify-center">
                <span className='text-[#ff4321] font_nanum text-[19px]'>Manage Your Budget</span>
                <h2 className='text-white text-[25px] lg:text-[54px] font_andika text-center font-bold leading-[46px] lg:leading-[66px] my-5'> Monitor Your Finances for Better <br/> Financial Management </h2>
                <button className='text-[17px] font_inter bg-[#007bff] text-[#fff] rounded-[5px] px-[20px] py-[14px] cursor-pointer'>Get Started Now</button>
            </section>

            <IncExp/>

        </main>

       
        
    );
};

export default Home;