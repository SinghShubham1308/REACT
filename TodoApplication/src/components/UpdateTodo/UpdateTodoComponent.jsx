import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { retreiveTodoWithId, updateTodoById } from "../../api/TodoApi";
import { useAuth } from "../Context/LoginContext";

export const UpdateTodoComponent = () => {
  const { id } = useParams();
  const user = useAuth();
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object({
    description: Yup.string()
      .required("Description is required")
      .min(3, "Description should be at least 3 characters long"),
    targetDate: Yup.date().required("Target date is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      description: "",
      done: false,
      targetDate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      updateTodoById(user.username, id, values)
        .then(() => navigate("/todos")) // Redirect after success
        .catch((error) => console.log("Error updating todo:", error));
    },
  });

  // Fetch data and set Formik values
  useEffect(() => {
    retreiveTodoWithId(user.username, id)
      .then((response) => {
        const { description, done, targetDate } = response.data;
        formik.setValues({
          description,
          done,
          targetDate: targetDate ? targetDate.split("T")[0] : "",
        });
      })
      .catch((error) => console.log("Error fetching todo:", error));
  }, [id]);

  return (
    <div className="container mt-5">
      <h2>Update Todo</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Description Input */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-danger">{formik.errors.description}</div>
          )}
        </div>

        {/* Target Date Input */}
        <div className="mb-3">
          <label className="form-label">Target Date</label>
          <input
            type="date"
            className="form-control"
            name="targetDate"
            value={formik.values.targetDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.targetDate && formik.errors.targetDate && (
            <div className="text-danger">{formik.errors.targetDate}</div>
          )}
        </div>

        {/* Done Checkbox */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="done"
            checked={formik.values.done}
            onChange={formik.handleChange} // Use formik.handleChange directly
          />
          <label className="form-check-label">Completed</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success" disabled={!formik.isValid}>
          Save
        </button>

        {/* Cancel Button */}
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/todos")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
