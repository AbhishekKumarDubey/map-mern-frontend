import './LoadingSpinner.css';

const LoadingSpinner = props => (
  <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
    <div className='lds-dual-ring'></div>
  </div>
);

export default LoadingSpinner;
