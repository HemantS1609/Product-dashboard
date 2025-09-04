import { Formik } from "formik";
import { FaSave, FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import "./ProductForm.css";

const ProductForm = ({ initialData, onSubmit, onCancel, btnLoading }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
  });

  const initialValues = {
    ...(initialData?.id && { id: initialData?.id }),
    title: initialData?.title || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
  };

  return (
    <Modal show={true} onHide={onCancel} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData?.title ? "Update" : "Add"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
          }}
        >
          {(props) => {
            const { values, errors, handleSubmit, handleChange, handleBlur } =
              props;
            return (
              <form className="product-form">
                <div className="row mb-3 gy-3">
                  <div className="col-md-12">
                    <input
                      type="text"
                      name="title"
                      placeholder="Product Title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {errors.title && (
                      <div className="error">{errors.title}</div>
                    )}
                  </div>
                  <div className="col-md-12"></div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      name="category"
                      placeholder="Category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {errors.category && (
                      <div className="error">{errors.category}</div>
                    )}
                  </div>
                  <div className="col-md-12"></div>

                  <div className="col-md-12">
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {errors.price && (
                      <div className="error">{errors.price}</div>
                    )}
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="save-btn"
                    onClick={handleSubmit}
                  >
                    {btnLoading ? (
                      <span className="loader"></span>
                    ) : (
                      <>
                        <FaSave style={{ marginRight: "6px" }} />
                        {initialData?.title ? "Update" : "Save"}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={onCancel}
                  >
                    <FaTimes style={{ marginRight: "6px" }} /> Cancel
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;
