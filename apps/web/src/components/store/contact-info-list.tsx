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
    <div className="space-y-4 text-sm leading-7 text-(--mm-text-soft)">
      {phoneNumber ? (
        <p>
          <span className="font-medium text-(--mm-text)">Telefone:</span>{" "}
          {phoneNumber}
        </p>
      ) : null}

      {contactEmail ? (
        <p>
          <span className="font-medium text-(--mm-text)">E-mail:</span>{" "}
          {contactEmail}
        </p>
      ) : null}

      {addressLine ? (
        <p>
          <span className="font-medium text-(--mm-text)">Endereço:</span>{" "}
          {addressLine}
          {city ? `, ${city}` : ""}
          {state ? ` - ${state}` : ""}
          {zipCode ? `, CEP ${zipCode}` : ""}
        </p>
      ) : null}
    </div>
  );
}