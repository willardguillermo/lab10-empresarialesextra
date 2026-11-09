// Reusable button: the content comes from `children` and the look from `variant`.
// It is type="button" by default so it never submits a form by accident, but the caller can
// override it (type="submit"). Every other prop (onClick, disabled, aria-label...) reaches the <button>.
const VARIANTS = ["primary", "danger", "ghost"];

export default function Button({ variant = "primary", type = "button", children, className, ...rest }) {
  const safeVariant = VARIANTS.includes(variant) ? variant : "primary";
  const classes = ["btn", `btn-${safeVariant}`, className].filter(Boolean).join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
