import {
  useEffect,
  useState
} from "react";


const emptyTicket = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Open"
};


function TicketForm({
  initialValues = emptyTicket,
  onSubmit,
  submitLabel
}) {

  const [formData, setFormData] =
    useState(emptyTicket);

  const [formError, setFormError] =
    useState("");


  useEffect(() => {

    setFormData({
      title: initialValues.title || "",
      description: initialValues.description || "",
      priority: initialValues.priority || "Medium",
      status: initialValues.status || "Open"
    });

  }, [initialValues]);


  function handleChange(event) {

    const {
      name,
      value
    } = event.target;


    setFormData((current) => ({
      ...current,
      [name]: value
    }));

  }


  async function handleSubmit(event) {

    event.preventDefault();


    if (
      !formData.title.trim() ||
      !formData.description.trim()
    ) {

      setFormError(
        "Title and description are required."
      );

      return;

    }


    setFormError("");

    await onSubmit(formData);

  }


  return (

    <form onSubmit={handleSubmit}>

      {formError && (

        <p className="error-message">
          {formError}
        </p>

      )}


      <div className="form-group">

        <label htmlFor="title">
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />

      </div>


      <div className="form-group">

        <label htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

      </div>


      <div className="form-group">

        <label htmlFor="priority">
          Priority
        </label>

        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >

          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>

        </select>

      </div>


      <div className="form-group">

        <label htmlFor="status">
          Status
        </label>

        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >

          <option value="Open">
            Open
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Resolved">
            Resolved
          </option>

        </select>

      </div>


      <button type="submit">
        {submitLabel}
      </button>

    </form>

  );

}


export default TicketForm;