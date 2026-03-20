import type { ViewportMode } from '../../config/viewports';

interface ViewportDebugProps {
  cameraPosition: string;
  inLibraryView: boolean;
  viewportMode: ViewportMode;
}

const ViewportDebug = ({
  cameraPosition,
  inLibraryView,
  viewportMode,
}: ViewportDebugProps) => {
  return (
    <>
      <div className="viewportDebug">
        <span className="viewportDebugTag">{viewportMode}</span>
        <span className="viewportDebugTag">{inLibraryView ? 'library' : 'room'}</span>
      </div>
      <div className="viewportDebugCoordsWrap">
        <span className="viewportDebugCoords">{cameraPosition}</span>
      </div>
    </>
  );
};

export default ViewportDebug;
