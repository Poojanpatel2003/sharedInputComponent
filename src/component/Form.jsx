import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./input.css";
import "react-toastify/dist/ReactToastify.css";

const SharedInputComponent = () => {
  const [formInstances, setFormInstances] = useState([]);

  useEffect(() => {
    const savedForms = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("formData-")) {
        const formId = parseInt(key.split("-")[1]);
        const formData = JSON.parse(localStorage.getItem(key));
        savedForms.push({ id: formId, formData });
      }
    });
    savedForms.sort((a, b) => a.id - b.id);
    setFormInstances(savedForms.length > 0 ? savedForms : createInitialForm());
  }, []);

  const createInitialForm = () => [
    {
      id: 1,
      formData: {
        firstName: "",
        secondName: "",
        address: "",
        subject: [],
        gender: "",
      },
    },
  ];

  const handleInputChange = (id, e) => {
    const { name, value } = e.target;
    setFormInstances((prevInstances) =>
      prevInstances.map((instance) =>
        instance.id === id
          ? { ...instance, formData: { ...instance.formData, [name]: value } }
          : instance
      )
    );
  };

  const handleCheckboxChange = (id, e) => {
    const { value, checked } = e.target;
    setFormInstances((prevInstances) =>
      prevInstances.map((instance) => {
        if (instance.id === id) {
          const updatedSubjects = checked
            ? [...instance.formData.subject, value]
            : instance.formData.subject.filter((s) => s !== value);
          return { ...instance, formData: { ...instance.formData, subject: updatedSubjects } };
        }
        return instance;
      })
    );
  };

  const validateForm = (formData) => {
    return (
      formData.firstName.trim() &&
      formData.secondName.trim() &&
      formData.address.trim() &&
      formData.subject.length &&
      formData.gender
    );
  };

  const handleSubmit = (id, e) => {
    e.preventDefault();
    const submittedForm = formInstances.find((instance) => instance.id === id);

    if (submittedForm && validateForm(submittedForm.formData)) {
      const localStorageKey = `formData-${id}`;
      localStorage.setItem(localStorageKey, JSON.stringify(submittedForm.formData));
      toast.success(`Data saved for Form ID: ${id}`, {
        position: "top-right",
      });
    } else {
      toast.error("Please fill out all fields before submitting!", {
        position: "top-right",
      });
    }
  };

  const handleAddForm = () => {
    const newId = formInstances.length > 0 ? formInstances[formInstances.length - 1].id + 1 : 1;
    const newForm = {
      id: newId,
      formData: {
        firstName: "",
        secondName: "",
        address: "",
        subject: [],
        gender: "",
      },
    };
    setFormInstances([...formInstances, newForm]);
    toast.info(`Form ${newId} added successfully`, {
      position: "top-right",
    });
  };

  const handleRemoveForm = (id) => {
    setFormInstances((prevInstances) => prevInstances.filter((instance) => instance.id !== id));
    localStorage.removeItem(`formData-${id}`);
    toast.warning(`Form ${id} removed successfully`, {
      position: "top-right",
    });
  };

  return (
    <div className="shared-input-component">
      <ToastContainer />
      <h1>Shared Input Component</h1>
      <div className="iconFlex">
        <h2>Manage Multiple Forms</h2>
        <div className="add-icon" onClick={handleAddForm}>
          +
        </div>
      </div>

      {formInstances.map((instance) => (
        <form
          key={instance.id}
          className="form-container"
          onSubmit={(e) => handleSubmit(instance.id, e)}
        >
          <h3>Form ID: {instance.id}</h3>
          <div className="input-group">
            <div className="input-box">
              <label>FirstName:</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter FirstName"
                value={instance.formData.firstName}
                onChange={(e) => handleInputChange(instance.id, e)}
              />
            </div>
            <div className="input-box">
              <label>SecondName:</label>
              <input
                type="text"
                name="secondName"
                placeholder="Enter SecondName"
                value={instance.formData.secondName}
                onChange={(e) => handleInputChange(instance.id, e)}
              />
            </div>
          </div>
          <div className="input-box">
            <label>Address:</label>
            <textarea
              name="address"
              placeholder="Enter Address"
              value={instance.formData.address}
              onChange={(e) => handleInputChange(instance.id, e)}
            />
          </div>
          <div className="options">
            <div className="subjects">
              <label>Subject:</label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="Maths"
                    checked={instance.formData.subject.includes("Maths")}
                    onChange={(e) => handleCheckboxChange(instance.id, e)}
                  />{" "}
                  Maths
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Science"
                    checked={instance.formData.subject.includes("Science")}
                    onChange={(e) => handleCheckboxChange(instance.id, e)}
                  />{" "}
                  Science
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Chemistry"
                    checked={instance.formData.subject.includes("Chemistry")}
                    onChange={(e) => handleCheckboxChange(instance.id, e)}
                  />{" "}
                  Chemistry
                </label>
              </div>
            </div>
            <div className="gender">
              <label>Gender:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={instance.formData.gender === "Male"}
                    onChange={(e) => handleInputChange(instance.id, e)}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={instance.formData.gender === "Female"}
                    onChange={(e) => handleInputChange(instance.id, e)}
                  />{" "}
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <button
              type="button"
              className="remove-btn"
              onClick={() => handleRemoveForm(instance.id)}
            >
              Remove
            </button>
          </div>
        </form>
      ))}
    </div>
  );
};

export default SharedInputComponent;
