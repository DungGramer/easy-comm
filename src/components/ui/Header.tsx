import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <div>
        <header className='header2023 js-header js-header-mobile'>
          <div className='header2023__inner'>
            <div className='header2023__left'>
              <a href='/' className='header2023__logo' />
            </div>
            <div className='header2023__center'>
              <nav className='header-menu'>
                <ul className='header-menu__list js-header-menu-desktop js-accords'>
                  <li className='header-menu__item'>
                    <span className='header-menu__link'>Công nghệ</span>
                  </li>
                  <li className='header-menu__item'>
                    <span className='header-menu__link'>Hướng dẫn</span>
                  </li>
                  <li className='header-menu__item'>
                    <span className='header-menu__link'>Về chúng tôi</span>
                  </li>
                  <li className='header-menu__item'>
                    <span className='header-menu__link'>Hỗ trợ dự án</span>
                  </li>
                </ul>
              </nav>
            </div>
            <div className='header2023__right'>
              <a
                id='Batton_A'
                href={"/hand-tracking"}
                className='header2023__button js-scroll-to'
              >
                Thử ngay
              </a>
            </div>
            <button className='header2023__burger'>
              <i />
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
