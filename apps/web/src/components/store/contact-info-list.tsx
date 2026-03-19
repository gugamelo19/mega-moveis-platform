type ContactInfoListProps = {
  phoneNumber?: string | null;
  contactEmail?: string | null;
  addressLine?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
};

export function ContactInfoList({
  phoneNumber,
  contactEmail,
  addressLine,
  city,
  state,
  zipCode,
}: ContactInfoListProps) {
  return (
    <div className="space-y-3 text-sm text-slate-600">
      {phoneNumber ? (
        <p>
          <span className="font-medium text-slate-900">Telefone:</span>{" "}
          {phoneNumber}
        </p>
      ) : null}

      {contactEmail ? (
        <p>
          <span className="font-medium text-slate-900">E-mail:</span>{" "}
          {contactEmail}
        </p>
      ) : null}

      {addressLine ? (
        <p>
          <span className="font-medium text-slate-900">Endereço:</span>{" "}
          {addressLine}
          {city ? `, ${city}` : ""}
          {state ? ` - ${state}` : ""}
          {zipCode ? `, CEP ${zipCode}` : ""}
        </p>
      ) : null}
    </div>
  );
}