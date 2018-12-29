<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>Hacker News</title>
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a href="{{ item.relname }}">{{ item.telephone }}</a>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>
