"use client";
import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { contact } from "@/content/site";

export default function VisitForm() {
  const [request, setRequest] = useState<string | null>(null);
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const nameField = form.elements.namedItem("name") as HTMLInputElement;
    const phoneField = form.elements.namedItem("phone") as HTMLInputElement;
    nameField.setCustomValidity(name ? "" : "Please enter your name.");
    phoneField.setCustomValidity(
      /^[+\d\s()-]+$/.test(phone) &&
        phone.replace(/\D/g, "").length >= 10 &&
        phone.replace(/\D/g, "").length <= 15
        ? ""
        : "Please enter a valid phone number with 10 to 15 digits.",
    );
    if (!form.reportValidity()) return;
    const date = String(data.get("date") || "Flexible");
    const message = `Hello Farm Natura! I’d like to plan a visit.\n\nName: ${name}\nPhone: ${phone}\nInterested in: ${data.get("interest")}\nPreferred date: ${date}\n${data.get("message") ? `\nMessage: ${String(data.get("message")).trim()}` : ""}\n\nPlease help me confirm a time and share directions.`;
    setRequest(`${contact.whatsapp}?text=${encodeURIComponent(message)}`);
  }
  return (
    <form className="visit-form" onSubmit={prepare} onChange={() => setRequest(null)}>
      <h2>Let’s plan your visit.</h2>
      <p>
        Tell us a little about yourself. We’ll help you prepare a message for the Farm Natura team.
      </p>
      <label className="field">
        <span>Your name *</span>
        <input
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          required
          maxLength={80}
          onInput={(e) => e.currentTarget.setCustomValidity("")}
        />
      </label>
      <label className="field">
        <span>Phone number *</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          required
          maxLength={22}
          onInput={(e) => e.currentTarget.setCustomValidity("")}
        />
      </label>
      <div className="form-row">
        <label className="field">
          <span>I’m interested in</span>
          <select name="interest" defaultValue="Managed farmland">
            <option>Managed farmland</option>
            <option>Farmhouse & farm living</option>
            <option>Natural farming</option>
            <option>Learning about the estate</option>
          </select>
        </label>
        <label className="field">
          <span>Preferred visit date</span>
          <input name="date" type="date" min={today} />
        </label>
      </div>
      <label className="field">
        <span>Anything you’d like us to know?</span>
        <textarea
          name="message"
          placeholder="Questions, plans, or who’s coming along…"
          maxLength={1200}
        />
      </label>
      <button className="button" type="submit">
        <span>Prepare my visit enquiry</span>
        <ArrowUpRight size={19} aria-hidden="true" />
      </button>
      <p className="form-note">
        Your details stay in this form until you choose to send them through WhatsApp. A visit is
        confirmed only after the team replies.
      </p>
      {request && (
        <div className="prepared-request" role="status">
          <p>Your message is ready. Open WhatsApp to review and send it to the Farm Natura team.</p>
          <a className="button" href={request} target="_blank" rel="noopener noreferrer">
            <span>Continue in WhatsApp</span>
            <MessageCircle size={19} aria-hidden="true" />
          </a>
        </div>
      )}
    </form>
  );
}
