/*
  Hue & Cry: email sign-up, shared by every page.

  SET THIS ONE LINE when the mailing list exists. Paste the form endpoint your
  list service gives you, for example:
    Formspree:  "https://formspree.io/f/abcdwxyz"
    Buttondown: "https://buttondown.com/api/emails/embed-subscribe/YOURNAME"
  The address is sent as a field called "email".

  Until it is set, the form politely says sign-up isn't open yet. It never
  pretends to have taken an address it hasn't.
*/
const SIGNUP_ENDPOINT = "";

(function () {
  function say(form, text) {
    const status = form.querySelector("[data-status]");
    if (status) { status.textContent = text; status.hidden = false; }
  }

  async function send(form) {
    const body = new FormData(form);
    try {
      const r = await fetch(SIGNUP_ENDPOINT, { method: "POST", body, headers: { Accept: "application/json" } });
      return r.ok;
    } catch (err) {
      // Some list services don't allow cross-site reads. Send blind; the
      // request still arrives, we just can't read the reply.
      await fetch(SIGNUP_ENDPOINT, { method: "POST", body, mode: "no-cors" });
      return true;
    }
  }

  document.querySelectorAll("form[data-signup]").forEach(function (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input ? input.value.trim() : "";
      if (!SIGNUP_ENDPOINT) { say(form, "Sign-up isn't open quite yet. Check back soon."); return; }
      const button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      let ok = false;
      try { ok = await send(form); } catch (err) { ok = false; }
      if (button) button.disabled = false;
      if (!ok) { say(form, "That didn't go through. Please try again in a moment."); return; }
      form.dispatchEvent(new CustomEvent("signed", { bubbles: true, detail: { email: email } }));
    });
  });
})();
