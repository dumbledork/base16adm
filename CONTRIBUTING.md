Contributing
=====

Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.


Code Guidelines
-----

### HTML

[Adhere to Code Guide](http://codeguide.co/#html)

- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
- Use CDNs and HTTPS for third-party JS when possible. We don't use protocol-relative URLs in this case - because they break when viewing the page locally via `file://`.
- Use WAI-ARIA attributes in documentation examples to promote accessibility.

### CSS

[Adhere to Code Guide](http://codeguide.co/#css)

- OOCSS style, separation of structure and skin.
- Except in rare cases, don't remove default `:focus` styles (via e.g. `outline: none;`) without providing alternative styles. See this [A11Y Project](http://a11yproject.com/posts/never-remove-css-outlines/) post for more details.
