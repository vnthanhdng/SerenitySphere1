import Link from 'next/link';
import { useRouter } from 'next/router';
import { Person, People, Tv, Gamepad } from '@styled-icons/material';
import {LocationDot} from '@styled-icons/fa-solid';

function SideNav() {
  const router = useRouter();
  const category = router.query.category;

  return (
    <div className='sidenav'>
      <ul className='sidenav__list'>
        <li className='sidenav__item'>
          <Link href='/feed/self'>
            <div className={`sidenav__link ${category === 'self' ? 'active' : ''}`}>
              <Person size={24} title='Me' />
              <span className='u-mt1'>Me</span>
            </div>
          </Link>
        </li>
        <li className='sidenav__item'>
          <Link href='/feed/people'>
            <div className={`sidenav__link ${category === 'people' ? 'active' : ''}`}>
              <People size={24} title='People' />
              <span className='u-mt1'>People</span>
            </div>
          </Link>
        </li>
        <li className='sidenav__item'>
          <Link href='/feed/spaces'>
            <div className={`sidenav__link ${category === 'spaces' ? 'active' : ''}`}>
              <LocationDot size={24} title='Spaces' />
              <span className='u-mt1'>Spaces</span>
            </div>
          </Link>
        </li>
        <li className='sidenav__item'>
          <Link href='/feed/media'>
            <div className={`sidenav__link ${category === 'media' ? 'active' : ''}`}>
              <Tv size={24} title='Media' />
              <span className='u-mt1'>Media</span>
            </div>
          </Link>
        </li>
        <li className='sidenav__item'>
          <Link href='/feed/hobbies'>
            <div className={`sidenav__link ${category === 'hobbies' ? 'active' : ''}`}>
              <Gamepad size={24} title='Hobbies' />
              <span className='u-mt1'>Hobbies</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
