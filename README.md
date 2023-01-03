# 🔭 JWST.fun

An web tool for mixing and colorizing images from JWST's NIRCam infrared images.
WebGL and the GPU is used to composite 6 readings from different infrared
wavelengths and display the result.

## Image Preparation and Compositing Process

1. Images were downloaded from the Space Telescope Science Institute's (STScI)
   [MAST portal](https://mast.stsci.edu/portal/Mashup/Clients/Mast/Portal.html)
   in .fits format. 6 infrared frequency fits files were downloaded for each
   observation.

2. [PixInsight](https://pixinsight.com/) was used to isolate the correct layer
   of the fits file and crop the image. Star registration was used to align each
   image with respect to the others so they could be stacked. Then the images
   were transformed using the histogram tool to bring out details in a range
   that could be viewed on a computer monitor. These images were then exported
   as grayscale .tiff files and converted to grayscale .png to reduce the size
   and prepare them for use in a browser.

3. Images were uploaded to an Amazon Web Services S3 bucket and cached globally
   using Cloudfront.

4. When the [https://jwst.fun](https://jwst.fun) web tool loads, it downloads
   each of the six .png images corresponding to each of the six infrared
   wavelengths imaged by the NIRCam instrument on JWST.
  
5. These images are loaded as textures into a GLSL fragment shader for fast
   compositing on the GPU.

6. Next, the levels of each grayscale texture are adjusted based on the user's
   settings for each filter in the web tools UI labeled "Levels."

7. Next, the adjusted grayscale texture is colorized using the hue and
   saturation provided by the user settings for each filter.

8. Finally, each layer is composited with the layer below it using the screen
   blend mode and the opacity provided by users' settings for each filter.

9. The final color value of the last layer is used for that fragment of the image.

10. Once each fragment is computed by the GPU, WebGL renders them to the
    viewport of the web tool.
