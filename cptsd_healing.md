---
title: 复杂性创伤后压力综合征和阿斯伯格综合征的自助治疗：基于躯体体验的视角
layout: default
---

<p>Original works of <strong>光瞳</strong> in Chinese</p>

{% comment %}
  1. Sort ALL pages by chapter, then part.
{% endcomment %}
{% assign all_pages_sorted = site.cptsd_healing | sort: 'part_order' | sort: 'chapter_order' %}

{% comment %}
  2. Group the sorted pages. The groups will now be in the correct order.
{% endcomment %}
{% assign pages_by_chapter = all_pages_sorted | group_by: 'chapter_title' %}

<h2>Table of Contents</h2>

<ul style="list-style-type: none; padding-left: 0;">
  {% for chapter in pages_by_chapter %}

    {% if chapter.items.size == 1 %}
      {% assign page = chapter.items[0] %}
      {% comment %} --- This is a SINGLE-PAGE chapter (like Preface) --- {% endcomment %}
      <li>
        <a href="{{ page.url | relative_url }}">
          {{ page.title }}
        </a>
        {% if page.read_time %}
          ({{ page.read_time }} min)
        {% endif %}
      </li>

    {% else %}
      {% comment %} --- This is a MULTI-PART chapter (like Ch 2) --- {% endcomment %}
      <li>
        <strong>{{ chapter.name }}</strong>

        {% assign total_time = 0 %}
        {% for page in chapter.items %}
          {% if page.read_time %}
            {% assign total_time = total_time | plus: page.read_time %}
          {% endif %}
        {% endfor %}
        {% if total_time > 0 %}
          <em>(Total: {{ total_time }} min)</em>
        {% endif %}

        <ul style="list-style-type: none; padding-left: 20px;">
          {% for page in chapter.items %}
            <li>
              <a href="{{ page.url | relative_url }}">
                {{ page.title }}
                {% if page.read_time %}
                  ({{ page.read_time }} min)
                {% endif %}
              </a>
            </li>
          {% endfor %}
        </ul>
      </li>
    {% endif %}

  {% endfor %}
</ul>