import TreeSVG from '../../icons/tree';
import TruckSVG from '../../icons/truck';
import ScaleSVG from '../../icons/scale';

function Navigation() {
  return (
    <nav className='navbar'>
      <h3 className='navbar-title'>
        Привіт, <strong>Mike</strong>
      </h3>
      <div className='navbar-links'>
        <div className='navbar-links__link'>
          <TruckSVG />
          <p>link1</p>
        </div>
        <div className='navbar-links__link'>
          <TreeSVG />
          <p>link2</p>
        </div>
        <div className='navbar-links__link'>
          <ScaleSVG />
          <p>link3</p>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
