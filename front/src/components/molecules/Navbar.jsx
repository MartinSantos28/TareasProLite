import Menu from "../../assets/img/menu.svg"

function Navbar() {


    return ( 
        <header className="navbarCol">
            <div >
                <img src={Menu} alt="" />
            </div>

            <div className="profile-info">
                <p>Jorge Alexis Arredondo</p>
                <div className="profile-image">JA</div>
            </div>
        </header>
     );
}

export default Navbar;