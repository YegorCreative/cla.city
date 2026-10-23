# Website photo optimization

- Always optimize user-provided photos before adding them to the website or replacing existing website photos.
- Use Squoosh or an equivalent image encoder, such as Pillow, Sharp, or cwebp. Prefer WebP or AVIF when appropriate.
- Resize to the dimensions needed for display, preserve the aspect ratio, remove unnecessary metadata, and choose compression that keeps good visual quality.
- Check the output dimensions and file size. Aim for a few hundred KB or less for large hero photos and smaller files for cards and thumbnails; adjust for the image's actual needs.
- Reference the optimized asset from the website. Avoid adding full-resolution source photos or unused intermediate exports to the repository.
