import {Header} from '../header';
import {Footer} from '../footer';
import {Sort} from '../sort';
import {CardList} from '../card-list';
import {Logo} from '../logo'
import './styles.css';

export function App() {
	return (
  <>
    <Header />
    <main className="content container">
      <Sort />
      <CardList />
    </main>
    <Footer />
  </>
  );
}
