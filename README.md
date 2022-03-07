## Tech Challenge Overview

### API
- Migration generated to add :primary_tag_id column to the Influencers table.
- Models relations established.
- Exemplary validations added.
- Serializer updated by adding :primary_tag to Influencer object.
- Influencers Controller index method created.

### Client
- List of influencers displayed.
- Primary Tag added to the Card component.
- Search bar implemented allowing filtering by handle, platform, and tags.
- Dropdown connected allowing filtering by platform.

Extra
- Sorting functionality added allowing sort by name and followers count. 
- "Clear Input" button added.
- Simple prioritizing by Primary Tag added. Cards with matching primary tags will appear on top.
