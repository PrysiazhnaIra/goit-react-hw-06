import css from "./Contact.module.css";
import { FaUser, FaPhone } from "react-icons/fa";

const Contact = ({ id, name, number, onDelete }) => {
  return (
    <li key={id} className={css.contactListItem}>
      <div className={css.dataBlock}>
        <div className={css.elemBlock}>
          <FaPhone className={css.icon} />
          <p>{name}</p>
        </div>
        <div className={css.elemBlock}>
          <FaUser className={css.icon} />
          <p>{number}</p>
        </div>
      </div>
      <button className={css.deleteButton} onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
