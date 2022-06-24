﻿// <auto-generated />
using System;
using System.Text.Json;
using ContentManageService.Services.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ContentManageService.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20220619085800_alter_banner_translation_pkey")]
    partial class alter_banner_translation_pkey
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ContentManageService.Entities.Banner", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int?>("Id"));

                    b.Property<string>("ComponentKey")
                        .HasMaxLength(25)
                        .HasColumnType("character varying(25)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<bool?>("IsDraft")
                        .HasColumnType("boolean");

                    b.Property<int?>("OrderPosition")
                        .HasColumnType("integer");

                    b.Property<string>("PageKey")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("character varying(25)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Banner");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2022, 6, 19, 9, 58, 0, 96, DateTimeKind.Local).AddTicks(7936),
                            IsDraft = false,
                            PageKey = "aboutheadline"
                        });
                });

            modelBuilder.Entity("ContentManageService.Entities.BannerTranslation", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int?>("Id"));

                    b.Property<string>("BannerDataHtml")
                        .HasColumnType("text");

                    b.Property<JsonDocument>("BannerDataJson")
                        .HasColumnType("jsonb");

                    b.Property<int>("BannerId")
                        .HasColumnType("integer");

                    b.Property<string>("LangKey")
                        .IsRequired()
                        .HasMaxLength(5)
                        .HasColumnType("character varying(5)");

                    b.Property<string>("PageKey")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("character varying(25)");

                    b.HasKey("Id");

                    b.HasIndex("BannerId");

                    b.ToTable("BannerTranslation");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            BannerDataJson = System.Text.Json.JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner cabeçalho\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"primeiro elemento\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"texto do primeiro elemento\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new System.Text.Json.JsonDocumentOptions()),
                            BannerId = 1,
                            LangKey = "pt-pt",
                            PageKey = "aboutheadline"
                        },
                        new
                        {
                            Id = 2,
                            BannerDataJson = System.Text.Json.JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner header\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"first item\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"first item text\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new System.Text.Json.JsonDocumentOptions()),
                            BannerId = 1,
                            LangKey = "en-us",
                            PageKey = "aboutheadline"
                        });
                });

            modelBuilder.Entity("ContentManageService.Entities.BannerTranslation", b =>
                {
                    b.HasOne("ContentManageService.Entities.Banner", "Banner")
                        .WithMany("BannerTranslations")
                        .HasForeignKey("BannerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Banner");
                });

            modelBuilder.Entity("ContentManageService.Entities.Banner", b =>
                {
                    b.Navigation("BannerTranslations");
                });
#pragma warning restore 612, 618
        }
    }
}