import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = props => (
  <Modal
    onCancel={props.onClear}
    show={!!props.error}
    header='An Error Occurred!'
    footer={<Button onClick={props.onClear}>Okay</Button>}
  >
    <p>{props.error}</p>
  </Modal>
);

export default ErrorModal;
