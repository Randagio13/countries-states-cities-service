# Security Policy

## Supported Versions

Only the **latest published minor** receives security fixes. Older minors are
not patched — upgrade to the current release, which you can check with
`npm view countries-states-cities-service version`.

This package ships **no runtime dependencies**, so a vulnerability in the
development toolchain (`pnpm audit`) does not reach code you install. Advisories
that only affect `devDependencies` are therefore not treated as security issues
in released artifacts.

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Report security issues by emailing **alessandro@commercelayer.io** with:

- A description of the vulnerability
- Steps to reproduce
- Potential impact
- (Optional) a suggested fix

You can expect an acknowledgement within **48 hours** and a resolution or status update within **7 days**.

Once fixed, we will credit you in the release notes unless you prefer to remain anonymous.
