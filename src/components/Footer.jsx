import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

function Footer() {
    return(
        <footer className='bg-gray-800 px-4 md:px-16 lg:px-28' py-8>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div>
                    <h2 className='text-lg font-bold mb-4 text-(--color-gris)'>Sobre nosotros</h2>
                    <p className="text-gray-300">
                        Somos una plataforma que conecta lectores con historias.
                    </p>
                </div>
                <div>
                    <h2 className='text-lg font-bold mb-4 text-(--color-gris)'>enlaces rapidos</h2>
                    <ul>
                        <li><Link to="/Library" className="hover:underline text-(--color-secundario) hover:text-cyan-400 ">Libreria</Link></li>
                        <li><Link to="/Home" className="hover:underline text-(--color-secundario) hover:text-cyan-400  ">Inicio</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-lg font-bold mb-4 text-(--color-gris)'>siguenos</h2>
                    <ul className="flex space-x-4">
                        <li><FaFacebookF className="text-blue-500"/><a  className="text-(--color-secundario) hover:text-cyan-400" href="https://www.facebook.com/josue.restrepo.790">facebook</a></li>
                        <li><FaTwitter className="hover:underline text-gray-300"/><a className="text-(--color-secundario) hover:text-cyan-400" href="https://x.com/">Twitter</a></li>
                        <li><FaInstagram className="text-orange-500"/><a className="text-(--color-secundario) hover:text-cyan-400" href="https://www.instagram.com/josue.restrepo/">instagram</a></li>
                        <li><FaTiktok/><a className="text-(--color-secundario) hover:text-cyan-400" href="https://www.tiktok.com/@josuerestrepo1">TikTok</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-600 py-4 text-gray-300 text-center mt-6">
                <p>© 2024 Josue y sus tres santiagos. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;