const emailPattern =
  /^[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;

export function isValidEmailAddress(email: string): boolean {
  if (email.length > 254 || !emailPattern.test(email)) return false;

  const [localPart, domain] = email.split("@");
  const topLevelDomain = domain.split(".").at(-1) ?? "";
  return (
    localPart.length <= 64 &&
    topLevelDomain.length >= 2 &&
    /[A-Z]/i.test(topLevelDomain)
  );
}
