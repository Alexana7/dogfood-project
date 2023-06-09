import cn from 'classnames';
import './styles.css';
import logoSrc from './assets/logo.svg';
import { Link } from 'react-router-dom';


export function Logo( { className, href, ...props}) {
  const hrefValue = href ? href : null;
  return (
      hrefValue
    
        ? <Link to={{ pathname: hrefValue }} className={cn('logo', {className: className})}>
            <img src={logoSrc} alt="logo" className="logo__pic" />
          </Link> 
        : <span className={`${className} logo`} {...props}>
           <img src={logoSrc} alt="logo" className="logo__pic" />
          </span>  
    
    
  );
}


