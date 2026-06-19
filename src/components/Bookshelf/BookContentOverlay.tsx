import type { BookProject } from '../../config/books';
import './BookContentOverlay.css';

interface BookContentOverlayProps {
  project: BookProject;
  onClose: () => void;
}

const BookContentOverlay = ({ project, onClose }: BookContentOverlayProps) => {
  return (
    <div className="bookContentOverlay">
      <div className="bookContentSpine" />
      <button className="bookContentClose" onClick={onClose} aria-label="Close">
        &#x2715;
      </button>

      <div className="bookContentPages">
        <div className="bookContentPage">
          <h1 className="bookContentTitle">{project.title}</h1>
          <p className="bookContentSubtitle">{project.subtitle}</p>
          <p className="bookContentDescription">{project.description}</p>

          {project.links.length > 0 && (
            <div className="bookContentLinks">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bookContentLink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="bookContentPage">
          <div className="bookContentSection">
            <h2 className="bookContentSectionTitle">Tech Stack</h2>
            <ul className="bookContentTechStack">
              {project.techStack.map((tech) => (
                <li key={tech} className="bookContentTechTag">{tech}</li>
              ))}
            </ul>
          </div>

          <div className="bookContentSection">
            <h2 className="bookContentSectionTitle">Features</h2>
            <ul className="bookContentFeatures">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookContentOverlay;
