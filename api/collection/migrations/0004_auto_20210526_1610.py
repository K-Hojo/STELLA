# Generated by Django 3.1.7 on 2021-05-26 07:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('collection', '0003_auto_20210526_1522'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='collectiondetail',
            unique_together={('collection', 'book')},
        ),
    ]
