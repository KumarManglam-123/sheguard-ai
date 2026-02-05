import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "./contact.css";

const AddContact = () => {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH CONTACTS ----------------

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8080/contacts");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Fetch contacts error:", err);
      toast.error("Failed to load contacts");
    }
  };

  // ---------------- ADD CONTACT ----------------

  const addContact = async () => {

    if (!name.trim() || !phone.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("http://127.0.0.1:8080/contacts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim()
        })
      });

      if (res.ok) {
        toast.success("Contact saved successfully");
        setName("");
        setPhone("");
        fetchContacts();
      } else {
        toast.error("Failed to save contact");
      }

    } catch (err) {
      console.error("Add contact error:", err);
      toast.error("Server error");

    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOAD ON START ----------------

  useEffect(() => {
    fetchContacts();
  }, []);

  return (

    <div className="contact-box">

      <h2>🚨 Emergency Contacts</h2>

      <div className="contact-inputs">

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={addContact} disabled={loading}>
          {loading ? "Saving..." : "Save Contact"}
        </button>

      </div>

      <div className="contact-list">

        {contacts.length === 0 ? (
          <p className="empty-text">No contacts added yet</p>
        ) : (
          contacts.map((c, i) => (
            <div key={i} className="contact-item">
              <span>{c.name}</span>
              <span>{c.phone}</span>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default AddContact;
