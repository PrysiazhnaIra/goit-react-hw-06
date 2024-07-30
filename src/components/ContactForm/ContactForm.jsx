import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, {
      message: "Name must contain only latin letters and a single space",
      excludeEmptyString: true,
    })
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^[0-9-]+$/, {
      message: "Must be digits (you can add hyphen (-))",
      excludeEmptyString: true,
    })
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const ContactForm = ({ addContact }) => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    if (!values.name || !values.number) {
      return;
    }

    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    addContact(newContact);
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
      validateOnChange={true}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label className={css.label} htmlFor="name">
            Name
          </label>
          <Field type="text" id="name" name="name" className={css.input} />
          <ErrorMessage name="name" component="div" className={css.error} />

          <label className={css.label} htmlFor="number">
            Number
          </label>
          <Field type="tel" id="number" name="number" className={css.input} />
          <ErrorMessage name="number" component="div" className={css.error} />

          <button type="submit" className={css.btn} disabled={isSubmitting}>
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
