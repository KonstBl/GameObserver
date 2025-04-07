import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4>Contacts</h4>
            <p>+380 67 649 11 05</p>
            <p>GameObserver@gmail.com</p>
            <p>Telegram: @GameObserver</p>
          </div>
          <div className="col-md-6">
            <h4>Navigate</h4>
            <ul className="list-unstyled">
              <li>
                <Link href="/games">
                  Games
                </Link>
              </li>
              <li>
                <Link href="/blogs">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/main">
                  About us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};


